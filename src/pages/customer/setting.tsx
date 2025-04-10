"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { customerService, type CustomerProfile } from "@/services/customer-service"
import { Loader2, Phone, Mail, MapPin, Check, AlertCircle, PencilLine } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const CustomerSetting = () => {
    const { user } = useAuth()
    const [profile, setProfile] = useState<CustomerProfile | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState<Partial<CustomerProfile>>({})
    const [activeTab, setActiveTab] = useState("profile")

    useEffect(() => {
        const fetchCustomerProfile = async () => {
            if (!user?.CustomerId) return

            setIsLoading(true)
            setError(null)

            try {
                const response = await customerService.getCustomerId(user.CustomerId)
                if (response.success && response.result) {
                    setProfile(response.result)
                    setFormData(response.result)
                } else {
                    setError(response.message || "Không thể tải thông tin khách hàng")
                }
            } catch (err) {
                console.error("Lỗi khi tải thông tin khách hàng:", err)
                setError("Đã xảy ra lỗi khi tải thông tin khách hàng")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCustomerProfile()
    }, [user?.CustomerId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleGenderChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            gender: value === "male",
        }))
    }

    const handleSaveProfile = () => {
        // Tạm thời chỉ cập nhật state local, trong thực tế sẽ gọi API
        setProfile((prev) => ({
            ...(prev as CustomerProfile),
            ...formData,
        }))
        setIsEditing(false)
    }

    // Lấy chữ cái đầu của tên người dùng cho avatar
    const getUserInitials = () => {
        const name = profile?.fullName || user?.name || ""
        if (!name) return "N"
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Cài Đặt Tài Khoản</h1>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                    <span>Đang tải thông tin...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                </div>
            ) : (
                <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="profile">Thông Tin Cá Nhân</TabsTrigger>
                        <TabsTrigger value="security">Bảo Mật</TabsTrigger>
                        <TabsTrigger value="preferences">Tùy Chọn</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Phần Avatar và thông tin cơ bản */}
                            <Card>
                                <CardHeader className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <Avatar className="h-24 w-24 border-4 border-primary/20">
                                            <AvatarImage
                                                src={`https://www.svgrepo.com/show/492671/avatar-girl.svg`}
                                                alt={profile?.fullName || user?.name || "Người dùng"}
                                            />
                                            <AvatarFallback className="bg-primary text-white text-2xl">{getUserInitials()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <CardTitle>{profile?.fullName || user?.name || "Chưa cập nhật"}</CardTitle>
                                    <CardDescription>{user?.unique_name || "Tài khoản người dùng"}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center">
                                        <Phone className="h-4 w-4 mr-2 text-primary" />
                                        <span>{profile?.phone || "Chưa cập nhật"}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-4 w-4 mr-2 text-primary" />
                                        <span>{profile?.email || "Chưa cập nhật"}</span>
                                        {profile?.isVerifiedEmail && (
                                            <span className="ml-2 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                                                <Check className="h-3 w-3 mr-0.5" />
                                                Đã xác thực
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                                        <span>{profile?.address || "Chưa cập nhật"}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        <PencilLine className="h-4 w-4 mr-2" />
                                        {isEditing ? "Hủy Chỉnh Sửa" : "Chỉnh Sửa Thông Tin"}
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* Phần thông tin chi tiết */}
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Thông Tin Chi Tiết</CardTitle>
                                    <CardDescription>
                                        {isEditing
                                            ? "Chỉnh sửa thông tin cá nhân của bạn"
                                            : "Xem và quản lý thông tin cá nhân của bạn"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {isEditing ? (
                                        // Form chỉnh sửa
                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="fullName">Họ và tên</Label>
                                                    <Input
                                                        id="fullName"
                                                        name="fullName"
                                                        value={formData.fullName || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="Nhập họ và tên"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="example@gmail.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Số điện thoại</Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone || ""}
                                                        onChange={handleInputChange}
                                                        placeholder="0912345678"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                                                    <Input
                                                        id="dateOfBirth"
                                                        name="dateOfBirth"
                                                        type="date"
                                                        value={formData.dateOfBirth?.split("T")[0] || ""}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Giới tính</Label>
                                                <RadioGroup
                                                    value={formData.gender === true ? "male" : formData.gender === false ? "female" : ""}
                                                    onValueChange={handleGenderChange}
                                                    className="flex space-x-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="male" id="male" />
                                                        <Label htmlFor="male">Nam</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="female" id="female" />
                                                        <Label htmlFor="female">Nữ</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="address">Địa chỉ</Label>
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    value={formData.address || ""}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập địa chỉ của bạn"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        // Hiển thị thông tin
                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Mã khách hàng</p>
                                                    <p className="font-mono">{profile?.id || user?.CustomerId || "Chưa cập nhật"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Họ và tên</p>
                                                    <p>{profile?.fullName || user?.name || "Chưa cập nhật"}</p>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                                    <div className="flex items-center">
                                                        <p>{profile?.email || "Chưa cập nhật"}</p>
                                                        {profile?.isVerifiedEmail && (
                                                            <span className="ml-2 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                                                                <Check className="h-3 w-3 mr-0.5" />
                                                                Đã xác thực
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Số điện thoại</p>
                                                    <p>{profile?.phone || "Chưa cập nhật"}</p>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Ngày sinh</p>
                                                    <p>
                                                        {profile?.dateOfBirth
                                                            ? new Date(profile.dateOfBirth).toLocaleDateString("vi-VN")
                                                            : "Chưa cập nhật"}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Giới tính</p>
                                                    <p>
                                                        {profile?.gender === true
                                                            ? "Nam"
                                                            : profile?.gender === false
                                                                ? "Nữ"
                                                                : "Chưa cập nhật"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
                                                <p>{profile?.address || "Chưa cập nhật"}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                                {isEditing && (
                                    <CardFooter className="flex justify-end space-x-2">
                                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                                            Hủy
                                        </Button>
                                        <Button onClick={handleSaveProfile}>Lưu Thay Đổi</Button>
                                    </CardFooter>
                                )}
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bảo Mật Tài Khoản</CardTitle>
                                <CardDescription>Quản lý mật khẩu và bảo mật tài khoản của bạn</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Đổi Mật Khẩu</h3>
                                    <p className="text-sm text-gray-500">
                                        Mật khẩu mạnh giúp bảo vệ tài khoản của bạn khỏi truy cập trái phép.
                                    </p>
                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                                            <Input id="currentPassword" type="password" placeholder="••••••••" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">Mật khẩu mới</Label>
                                            <Input id="newPassword" type="password" placeholder="••••••••" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                                            <Input id="confirmPassword" type="password" placeholder="••••••••" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button>Cập Nhật Mật Khẩu</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preferences">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tùy Chọn Người Dùng</CardTitle>
                                <CardDescription>Quản lý các tùy chọn và cài đặt cá nhân</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center py-12 text-gray-500">Tính năng đang được phát triển</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    )
}

export default CustomerSetting

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, User, Mail, Shield, Calendar, Camera, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [userInfo, setUserInfo] = useState(() => {
        const info = localStorage.getItem("userInfo");
        return info ? JSON.parse(info) : null;
    });

    const [profilePic, setProfilePic] = useState(userInfo?.profilePic || null);
    const [isUploading, setIsUploading] = useState(false);

    if (!userInfo) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-[var(--bg-main)]">
                <h2 className="text-[var(--text-primary)] text-xl font-bold mb-4">No Profile Data Found</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[var(--accent-primary)] text-white px-6 py-2 rounded-lg font-bold"
                >
                    Login
                </button>
            </div>
        );
    }

    // Generate Initials
    const getInitials = (name) => {
        if (!name) return "??";
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0].slice(0, 2).toUpperCase();
    };

    const updateProfileOnServer = async (updatedData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const data = await response.json();

            // Re-fetch existing userInfo to preserve the token
            const currentInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
            const newInfo = { ...currentInfo, ...data };

            localStorage.setItem("userInfo", JSON.stringify(newInfo));
            window.dispatchEvent(new Event('userInfoUpdated'));
            setUserInfo(newInfo);
            setProfilePic(newInfo.profilePic);
            return true;
        } catch (error) {
            console.error('Update error:', error);
            alert(error.message);
            return false;
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('File size should be less than 2MB');
            return;
        }

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            const success = await updateProfileOnServer({ profilePic: base64String });
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const removeProfilePic = async (e) => {
        e.stopPropagation();
        setIsUploading(true);
        const success = await updateProfileOnServer({ profilePic: null });
        setIsUploading(false);
    };

    const profileFields = [
        { label: "Full Name", value: userInfo.name, icon: <User size={18} /> },
        { label: "Email Address", value: userInfo.email, icon: <Mail size={18} /> },
        { label: "Account ID", value: userInfo._id, icon: <Shield size={18} /> },
        { label: "Member Since", value: "2026", icon: <Calendar size={18} /> }
    ];

    return (
        <div className="h-full flex flex-col bg-[var(--bg-main)] text-[var(--text-secondary)] font-sans">
            {/* Header */}
            <div className="flex items-center gap-4 p-4 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
                <button onClick={() => navigate(-1)} className="p-1 hover:bg-[var(--border-primary)] rounded transition-colors text-[var(--text-primary)]">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-[var(--text-primary)] text-lg font-bold">User Profile</h1>
            </div>

            <div className="flex-1 overflow-y-auto customscrollbar p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group/avatar">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-28 h-28 rounded-full bg-[var(--bg-card)] flex items-center justify-center text-[var(--accent-primary)] font-bold text-3xl border-4 border-[var(--bg-secondary)] shadow-xl overflow-hidden cursor-pointer relative"
                            >
                                {profilePic ? (
                                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    getInitials(userInfo.name)
                                )}

                                {isUploading && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Loader2 size={24} className="animate-spin text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Camera Icon - Bottom Right */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 p-2 bg-[var(--accent-primary)] text-white rounded-full shadow-lg border-2 border-[var(--bg-secondary)] hover:scale-110 transition-transform z-10"
                            >
                                <Camera size={16} />
                            </button>

                            {profilePic && (
                                <button
                                    onClick={removeProfilePic}
                                    className="absolute -top-1 -right-1 p-1 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-full text-[var(--text-muted)] hover:text-red-500 shadow-lg z-10"
                                >
                                    <X size={14} />
                                </button>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                        <h2 className="text-[var(--text-primary)] text-xl font-bold capitalize mt-4">{userInfo.name}</h2>
                        <span className="text-[var(--text-muted)] text-sm">{userInfo.email}</span>
                    </div>

                    {/* Details Cards */}
                    <div className="grid gap-4">
                        {profileFields.map((field, index) => (
                            <div key={index} className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-primary)] flex items-center gap-4 hover:border-[var(--accent-primary)]/50 transition-all group">
                                <div className="p-3 bg-[var(--bg-card)] rounded-lg text-[var(--accent-primary)] group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all">
                                    {field.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mb-1">{field.label}</p>
                                    <p className="text-[var(--text-primary)] font-medium text-sm break-all">{field.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Security Note */}
                    <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                        <div className="flex gap-3">
                            <Shield className="text-blue-500 shrink-0" size={18} />
                            <div>
                                <p className="text-blue-400 text-xs font-bold mb-1">Security Note</p>
                                <p className="text-[var(--text-muted)] text-[10px] leading-relaxed">
                                    Your account details are securely stored. Never share your Account ID or credentials with anyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

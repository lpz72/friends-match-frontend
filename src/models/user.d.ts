/**
 * 用户类别
 */
export type UserType = {
    data: any;
    id: number;
    username: string;
    profile: string;
    userAccount: string;
    avatarUrl: string;
    gender: number;
    email: string;
    phone: string;
    userStatus: number;
    userRole: number;
    planetCode?: string;
    createTime: Date;
    tags: string[];
};
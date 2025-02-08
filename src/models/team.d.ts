/**
 * 用户类别
 */
export type TeamType = {
    id: number;
    description: String;
    expireTime?: Date;
    maxNum: number;
    name: String;
    password?: String;
    //todo 定义枚举类型，更规范
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    userId: number;
    hasJoin: boolean;
    hasJoinNum?: number;
};
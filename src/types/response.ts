export type requestResponse = {
    id: number;
    public_flags: number;
    username: string;
    global_name: string;
    discriminator: number | string;
    avatar: string;
    avatar_decoration: string;
    banner?: string;
    banner_color: string;
    accent_color: number;
};

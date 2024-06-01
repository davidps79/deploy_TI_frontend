import AuthWall from "@/components/AuthWall";
import ChatLoader from "@/components/ChatLoader";

const Page = () => {
    return (
        <AuthWall>
            <ChatLoader />
        </AuthWall>
    )
}

export default Page;
import UserHeader from ".././components/UserHeader";
import UserPost from ".././components/UserPost";

function UserPage() {
  return (
    <>
    <div>UserPage</div>
    <UserHeader/>
    <UserPost likes={1200} replies={634} postImg="/post1.png" postTitle="Let's talk about threads"  />
    <UserPost likes={69} replies={355} postImg="/post2.png" postTitle="learn something awesome"  />
    <UserPost likes={354} replies={69} postImg="/post3.png" postTitle="abracadabra"  />
    <UserPost likes={140} replies={69} postTitle="nigger, less go...I aint got any image"  />
    </>
)

}

export default UserPage
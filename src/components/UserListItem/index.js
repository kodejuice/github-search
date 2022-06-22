import Skeleton from "react-loading-skeleton";
import { useUser } from "../../hooks";

export function UserListItem({ data }) {
  const { data: user, isLoading, error } = useUser(data.login);
  const loaded = !isLoading && user?.login;

  const name = loaded && user.name;
  const bio = loaded && user.bio;
  const followers = loaded && user.followers;
  const following = loaded && user.following;
  const location = (loaded && user.location) || "";

  // if (error) return null;
  return (
    <li className="list-item">
      <div className="list-item-img-wrap">
        <a href={data.html_url}>
          <img
            alt="user avatar"
            title={location}
            src={data.avatar_url}
            className="list-item-image"
          />
        </a>
      </div>
      <div className="list-item-content">
        <a id="fname" href={data.html_url}>
          {isLoading ? (
            <Skeleton
              width="7em"
              inline
              height="0.9em"
              count={1}
              baseColor="#adbac7"
            />
          ) : (
            name
          )}
        </a>{" "}
        <span>
          <a id="uname" href={data.html_url}>
            @{data.login}
          </a>
        </span>
        <div id="stats">
          {isLoading ? (
            <Skeleton
              width="12em"
              height="0.7em"
              count={1}
              baseColor="#adbac7"
            />
          ) : (
            <>
              <b>{followers}</b> followers • <b>{following}</b> following
            </>
          )}
        </div>
        {isLoading ? (
          <Skeleton
            width="7em"
            style={{ marginTop: "15px" }}
            height="0.3em"
            count={1}
            baseColor="#adbac7"
          />
        ) : (
          <p id="bio">{bio} </p>
        )}
      </div>
    </li>
  );
}

import { Card, Modal } from "flowbite-react";
import { Nav } from "./Nav";
import Grid from "./Grid";
import { useEffect, useState } from "react";
import { BackgroundBeams } from "./BackgroundBeams";
import {
  IContestEntry,
  IUser,
  getImageOfUser,
  getLeaderboard,
} from "../api/getLeaderboard";
import Loading from "./Loading";

// type User = {
//   username: string;
//   score: string;
//   prompt: string;
//   imgSrc: string;
// };

// const promptText = `
//   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//   eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//   enim ad minim veniam, quis nostrud exercitation ullamco laboris
//   nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
//   in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//   nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//   sunt in culpa qui officia deserunt mollit anim id est laborum.
// `;

function smallDecimals(value: number) {
  return value.toFixed(2);
}

// const createMockUser: () => User = () => ({
//   username: faker.internet.userName(),
//   date: "09/11/2024",
//   score: `${faker.number.int({ min: 1, max: 100 })}%`,
//   prompt: promptText,
//   imgSrc: faker.image.urlPicsumPhotos(),
//   // "https://plus.unsplash.com/premium_photo-1709311451518-f1b9cb3dab5b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// });

interface LeaderboardProps {}

// let all_users = Array(23)
//   .fill(0)
//   .map(() => Array(20).fill(0).map(createMockUser));
// let users = all_users[0].sort(
//   (a, b) =>
//     parseInt(b.score.replace(/%/g, ""), 10) -
//     parseInt(a.score.replace(/%/g, ""), 10)
// ) as User[];

export const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [leaderboard, setLeaderboard] = useState<IUser[]>([]);
  const [userContestData, setUserContestData] = useState<IContestEntry[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  // const [searchTerm, setsearchTerm] = useState("");
  // const old = useRef(0);
  // const [i, seti] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setloading(true);
      const fetchedLeaderboard = await getLeaderboard();
      const fetchedUserContestData = await Promise.all(
        fetchedLeaderboard.map((user) =>
          getImageOfUser(user.sessionId, user.bestContestEntryIndex)
        )
      );
      setLeaderboard(fetchedLeaderboard);
      setUserContestData(fetchedUserContestData);
      setloading(false);
    }

    fetchData();
  }, []);

  // if (i !== old.current) {
  //   users = all_users[i].sort(
  //     (a, b) =>
  //       parseInt(b.score.replace(/%/g, ""), 10) -
  //       parseInt(a.score.replace(/%/g, ""), 10)
  //   );
  // }

  // old.current = i;

  const closeModal = () => {
    setModalOpen(false);
  };

  const getContentOfUser = (user: IUser) => {
    const contestEntry = userContestData.find(
      (entry) => entry.sessionId === user.sessionId
    );
    return {
      image: "data:image/jpeg;base64," + contestEntry?.image,
      prompt: contestEntry?.prompt,
    };
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setsearchTerm(e.target.value);
  // };

  console.log({ selectedUser });

  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
      <Nav />
      <BackgroundBeams className="z-[-1] absolute inset-0" />

      <div className="container mt-10 w-100 p-6">
        <div className="relative flex justify-center items-center mb-6">
          <div className="text-center flex-grow"></div>
          <div className="absolute right-0"></div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Grid>
            {leaderboard.map((user, i) => (
              <div className="mb-2" key={i}>
                <button
                  className="w-full h-full"
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedUser(user);
                  }}
                >
                  <Card className="text-center relative">
                    <img
                      src={getContentOfUser(user)?.image}
                      alt=""
                      className="block mx-auto max-w-full h-auto"
                    />
                    <div className="font-bold text-cyan-800">{user.name}</div>
                    <div className="font-bold text-cyan-800">
                      {`${smallDecimals(user.bestScore)} %`}
                    </div>
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-white px-2 py-1 text-sm font-bold">
                      #{i + 1}
                    </div>
                  </Card>
                </button>
              </div>
            ))}
          </Grid>
        )}
      </div>
      {modalOpen && selectedUser && (
        <Modal show={modalOpen} onClose={closeModal} dismissible>
          <div className="relative flex flex-col py-3 overflow-y-auto h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900 focus:outline-none bg-transparent border-none"
            >
              x
            </button>
            <div className="max-w-full h-auto px-24 py-4">
              <img
                src={getContentOfUser(selectedUser)?.image}
                alt=""
                className="block mx-auto rounded-lg"
              />
            </div>
            <div className="text-center mt-4 font-bold">
              {selectedUser.name}
            </div>
            <div className="p-4 mt-2 max-h-20">
              <h2 className="text-cyan-800 font-bold p-1">Prompt</h2>
              <p className="border text-cyan-800 border-gray-300 overflow-y-auto p-4">
                {getContentOfUser(selectedUser)?.prompt}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

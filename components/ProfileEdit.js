import { RiLinkedinBoxFill, RiTwitterFill, RiGithubFill } from "react-icons/ri";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  docSnap,
} from "@firebase/firestore";
import { db, auth } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/context";
import { useRouter } from "next/router";




export default function ProfileEdit() {
  const { user, username } = useContext(UserContext);
  console.log(user);

  // Set page data
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  );
  const [displayName, setDisplayName] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [interests, setInterests] = useState(["Loading..."]);
  const [languages, setLanguages] = useState(["Loading..."]);
  const [prefers, setPrefers] = useState(["Loading..."]);
  const [stack, setStack] = useState(["Loading..."]);
  const [portfolioUrl, setPortfolioUrl] = useState("portfolio-url.com");
  const [location, setLocation] = useState("Loading...");
  const [socialGithub, setSocialGithub] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [openToWork, setOpenToWork] = useState(false);
  const [githubId, setGitHubId] = useState("Loading");
  const [firstName, setFirstName] = useState("Loading");
  const [lastName, setLastName] = useState("Loading");
  const [email, setEmail] = useState("Loading");
  const [userName, setUserName] = useState("Loading");
  const [userId, setUserId] = useState();

  const [checked, setChecked] = useState({
    Python: false,
    NextJS: false,
    Tailwind: false,
    Firebase: false,
    MERN: false,
    Java: false,
    TypeScript: false,
    Dart: false,
    Bootstrap: false,
  });

  useEffect(() => {
    if (user) {
      const uid = auth.currentUser.uid;
      console.log(uid);
      setUserId(uid);
      const docRef = doc(db, "users", uid);
      const docSnap = getDoc(docRef).then((doc) => {
        docSnap = doc.data();
        console.log("docSnap", docSnap);
        setPhotoURL(docSnap.photoURL);
        setDisplayName(docSnap.displayName);
        setBio(docSnap.bio);
        setInterests(docSnap.interests);
        console.log("INTERESTS__________________", docSnap.interests);
        setLanguages(docSnap.languages);
        setPrefers(docSnap.prefers);
        setStack(docSnap.stack);
        setPortfolioUrl(docSnap.portfolioUrl);
        setLocation(docSnap.location);
        setSocialGithub(docSnap.socialGithub);
        setSocialLinkedin(docSnap.socialLinkedin);
        setSocialTwitter(docSnap.socialTwitter);
        setOpenToWork(docSnap.openToWork);
        setGitHubId(docSnap.githubId);
        setEmail(docSnap.email);
        setUserName(docSnap.githubId);
      });
    }
  }, [user]);
  const router = useRouter();
  async function saveHandle(e) {
    e.preventDefault();
    console.log("UID", userId);
    const docRef = doc(db, "users", userId);
    const payload = {
      displayName,
      bio,
      interests,
      languages,
      prefers,
      stack,
      portfolioUrl,
      location,
      socialGithub,
      socialLinkedin,
      socialTwitter,
      openToWork,
      githubId,
      firstName,
      lastName,
      email,
      photoURL,
      userName,
    };
    await setDoc(docRef, payload);
    router.push("/user/profile")
  }

  function stackHandler(value) {
    console.log("Bang!");
    for (let i = 0; i <= stack.length; i++) {
      if (stack.includes(value)) {
        console.log("Problem!");
      } else {
        setStack([...stack, value]);
        console.log("Stack content", stack);
        setChecked(() => {
          return {
            [value]: true,
          };
        });
      }
    }
  }
  const deleteStack = (stackFromBelow) => {
    setStack(stack.filter((stackItem, index) => stackItem !== stackFromBelow));
    setChecked(() => {
      return {
        [stackFromBelow]: false,
      };
    });
  };

  function interestsHandler(e){
    const interestObject= {...interests};
    interestObject[e.target.name] = e.target.value;
    setInterests(interestObject);
  }
  function prefersHandler(e){
    const prefersObject= {...prefers};
    prefersObject[e.target.name] = e.target.value;
    setPrefers(prefersObject);
  }
  function languagesHandler(e){
    const languageObject= {...languages};
    languageObject[e.target.name] = e.target.value;
    setLanguages(languageObject);
  }


  return (
    <div className="mx-1 rounded-sm flex flex-row shadow-lg shadow-zinc-400/10 border border-zinc-800/20">
      <div className="p-3 sm:p-6 text-zinc-100 w-full space-y-6">
        <p class=" flex w-full text-2xl justify-center m-6">Edit Profile</p>
        <div className="space-y-1">
          <fieldset>
            <div>
              <legend class="text-base font-medium text-white-900 mb-3">
                Add/Remove Stack
              </legend>
            </div>
            <div className="space-x-2 flex justify-between w-1/2 mb-6">
            <p class= "mr-5">Current stack:</p>
              {stack.map((stackItem, index) => {
                return (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700">
                    {stackItem}
                    <span
                      onClick={(e) => deleteStack(stackItem)}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                    >
                      X
                    </span>
                    {console.log("Stack ITEM ______:", stackItem)}
                  </span>
                );
              })}
            </div>
            <div class="flex justify-between w-1/2">
              <p>Click to add stack</p>
              <div class="flex justify-between w-1/2">
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="Python"
                      disabled={checked.Python}
                    >
                      Python
                    </button>
                  </div>
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="NextJS"
                      disabled={checked.NextJS}
                    >
                      NextJS
                    </button>
                  </div>
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="Tailwind"
                      disabled={checked.Tailwind}
                    >
                      Tailwind
                    </button>
                  </div>
                </div>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="Firebase"
                      disabled={checked.Firebase}
                    >
                      Firebase
                    </button>
                  </div>
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="MERN"
                      disabled={checked.MERN}
                    >
                      MERN
                    </button>
                  </div>
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="Java"
                      disabled={checked.Java}
                    >
                      Java
                    </button>
                  </div>
                </div>
                <div class="mt-4 space-y-4">
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="TypeScript"
                      disabled={checked.TypeScript}
                    >
                      TypeScript
                    </button>
                  </div>
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="Dart"
                      disabled={checked.Dart}
                    >
                      Dart
                    </button>
                  </div>
                  <div class="flex items-center">
                    <button
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-zinc-50 bg-gradient-to-br from-zinc-800 to-zinc-700"
                      onClick={(e) => stackHandler(e.target.value)}
                      value="Bootstrap"
                      disabled={checked.Bootstrap}
                    >
                      Bootstrap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="px-4 py-3 text-right sm:px-6 ">
                    <button
                      onClick={(e) => saveHandle(e)}
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>
        <div>
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-white">
                  Profile
                </h3>
                <p class="mt-1 text-sm text-white">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div class="shadow sm:rounded-md sm:overflow-hidden">
                  <div class="px-4 py-5 bg-zinc-800 space-y-6 sm:p-6"> 
                    <div class="grid grid-cols-3 gap-6">
                      <div class="col-span-3 sm:col-span-2">
                        <label
                          for="company-website"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          {" "}
                          Username{" "}
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="userName"
                            id="userName"
                            class="bg-zinc-700 text-zinc-200 p-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none text-zinc-200 rounded-r-md sm:text-sm border-gray-300"
                            placeholder={githubId}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-3 gap-6">
                      <div class="col-span-3 sm:col-span-2">
                        <label
                          for="company-website"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          {" "}
                          Display name{" "}
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            class="bg-zinc-700 text-zinc-200 p-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm text-zinc-200  border-gray-300"
                            placeholder={displayName}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        for="about"
                        class="block text-sm font-medium text-zinc-200"
                      >
                        {" "}
                        About you{" "}
                      </label>
                      <div class="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows="3"
                          class="bg-zinc-700 text-zinc-200 p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm text-zinc-200 border border-zinc-800 rounded-md"
                          placeholder={bio}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                      </div>
                      <p class="mt-2 text-sm text-zinc-200">
                        Brief description about you.
                      </p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-zinc-200">
                        {" "}
                        Photo{" "}
                      </label>
                      <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <img
                            class="h-full w-full text-gray-300"
                            src={photoURL}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          />
                        </span>
                        <div class="mt-1 w-full flex rounded-md shadow-sm">
                          <span class="text-zinc-200 ml-3">New URL: </span>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            class="bg-zinc-700 text-zinc-200 p-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 ml-4"
                            placeholder={photoURL}
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-x-2 flex flex-row items-center mt-5">
                        <div class="flex">
                          <RiGithubFill className="h-6 w-6 cursor-pointer text-zinc-200 hover:text-zinc-50" />
                          <input
                            type="text"
                            name="username"
                            id="username"
                            class="focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-700 text-zinc-200 p-1 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 ml-4"
                            placeholder={socialGithub}
                            value={socialGithub}
                            onChange={(e) => setSocialGithub(e.target.value)}
                          />
                        </div>

                        <div class="flex">
                          <RiLinkedinBoxFill className="h-6 w-6 cursor-pointer text-zinc-200 hover:text-zinc-50" />
                          <input
                            type="text"
                            name="username"
                            id="username"
                            class="bg-zinc-700 text-zinc-200 p-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 ml-4"
                            placeholder={socialLinkedin}
                            value={socialLinkedin}
                            onChange={(e) => setSocialLinkedin(e.target.value)}
                          />
                        </div>

                        <div class="flex">
                          <RiTwitterFill className="h-6 w-6 cursor-pointer text-zinc-200 hover:text-zinc-50" />
                          <input
                            type="text"
                            name="username"
                            id="username"
                            class="bg-zinc-700 text-zinc-200 p-1 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 ml-4"
                            placeholder={socialTwitter}
                            value={socialTwitter}
                            onChange={(e) => setSocialTwitter(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="mt-5 col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Portfolio URL
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          placeholder={portfolioUrl}
                          value={portfolioUrl}
                          onChange={(e) => setPortfolioUrl(e.target.value)}
                          class="bg-zinc-700 text-zinc-200 p-1 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-zinc-900 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right sm:px-6 bg-zinc-800 ">
                    <button
                      onClick={(e) => saveHandle(e)}
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0 ">
          <div class="md:grid md:grid-cols-3 md:gap-6 ">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-white">
                  Personal Information
                </h3>
                <p class="mt-1 text-sm text-white">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2 ">
              <form action="#" method="POST ">
                <div class="shadow overflow-hidden sm:rounded-md ">
                  <div class="px-4 py-5 bg-zinc-800 border border-zinc-800 border-rounded sm:p-6 ">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          placeholder={firstName}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          class="bg-zinc-700 text-zinc-200 p-1  mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          placeholder={lastName}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6 sm:col-span-4">
                        <label
                          for="email-address"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          placeholder={email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                        />
                      </div>

                      

                      <div class="col-span-6">
                        <label
                          for="location"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder={location}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          name="location"
                          id="location"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                        />
                      </div>

                      <div class="col-span-6">
                        <label
                          for="interests"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Interests
                        </label>
                        <input
                          type="text"
                          placeholder={interests[0]}
                          name="0"
                          id="interests0"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                           
                          onChange={(e)=> {interestsHandler(e)}}
                        />
                        <input
                          type="text"
                          placeholder={interests[1]}
                          name="1"
                          id="interests1"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {interestsHandler(e)}}
                        />
                        <input
                          type="text"
                          placeholder={interests[2]}
                          name="2"
                          id="interests2"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {interestsHandler(e)}}
                        />
                      </div>

                      <div class="col-span-6">
                        <label
                          for="prefers"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Prefers
                        </label>
                        <input
                          type="text"
                          placeholder={prefers[0]}
                          name="0"
                          id="prefers0"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {prefersHandler(e)}}
                        />
                        <input
                          type="text"
                          placeholder={prefers[1]}
                          name="1"
                          id="prefers1"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {prefersHandler(e)}}
                        />
                        <input
                          type="text"
                          placeholder={prefers[2]}
                          name="2"
                          id="prefers2"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {prefersHandler(e)}}
                        />
                      </div>

                      <div class="col-span-6">
                        <label
                          for="languages"
                          class="block text-sm font-medium text-zinc-200"
                        >
                          Languages
                        </label>
                        <input
                          type="text"
                          placeholder={languages[0]}
                          name="0"
                          id="languages0"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {languagesHandler(e)}}
                        />
                        <input
                          type="text"
                          placeholder={languages[1]}
                          name="1"
                          id="languages1"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {languagesHandler(e)}}
                        />
                        <input
                          type="text"
                          placeholder={languages[2]}
                          name="2"
                          id="languages2"
                          class="p-1 bg-zinc-700 text-zinc-200 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-1/3 shadow-sm sm:text-sm text-zinc-200 border-gray-300 rounded-md"
                          onChange={(e)=> {languagesHandler(e)}}
                       />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 text-right sm:px-6 bg-zinc-800 ">
                    <button
                      onClick={(e) => saveHandle(e)}
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        

      </div>
    </div>
  );
}

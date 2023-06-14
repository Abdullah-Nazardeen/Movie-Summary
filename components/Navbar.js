import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/nextjs";

const Navbar = ({search}) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    if(user) {
      console.log(user)
      setIsAdmin(user.publicMetadata.role === "admin");
    }
  }, [user]);

  return (
    <nav className="bg-gray-800 text-white py-5 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-lg md:text-2xl flex items-center">
              Movie<span className="text-red-500">Summaries</span>
          </Link>
          <Link href="/" className="hover:text-gray-300 text-lg md:text-2xl ml-8">Home</Link>
        </div>
        <div className="flex space-x-6 items-center">
          <SignedIn>
            {isAdmin && (
              <>
                <Link href="/admin/add" className="hover:text-gray-300 text-lg md:text-1xl flex">
                  Add Movie Summary
                </Link>
                <Link href="/admin/manage" className="hover:text-gray-300 text-lg md:text-1xl flex">
                  Manage Movie Summaries
                </Link>
              </>
            )}
          </SignedIn>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

import { signOut } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { Zap, User } from "lucide-react";

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full">
      <div className="container p-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Zap />
          <h5 className="mt-0.5">ToolNest</h5>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">
            Tools
          </Link>
          <Link href="/tools/select" className="text-sm font-medium hover:text-primary transition-colors">
            Convert
          </Link>
          <Link href="/tools/universal" className="text-sm font-medium hover:text-primary transition-colors">
            Universal
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <User />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={5}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link className="cursor-pointer" href="/profile">
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="p-0" asChild>
                    <form action={signOut}>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-sm w-full"
                        type="submit"
                      >
                        Logout
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

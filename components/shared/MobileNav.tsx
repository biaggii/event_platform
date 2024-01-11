import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>

        <SheetTrigger className="align-baseline">
          <Image src='/assets/icons/menu.svg' alt="menu" width={24} height={24} className="cursor-pointer" />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image src='/assets/images/logo.svg' alt='Evently' width={128} height={38} />
          <Separator className='border border-b-gray-50' />
          <NavItems />
        </SheetContent>

      </Sheet>
    </nav>
  );
};

export default MobileNav;
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Chatbot from "./chatbot-component";
import { IoChatbubble } from "react-icons/io5";

export default function ChatbotPopover() {
  return (
    <Popover className="relative z-10">
      <PopoverButton as="button" className="btn btn-circle btn-secondary p-2">
        <IoChatbubble className="text-2xl" />
      </PopoverButton>
      <PopoverPanel unmount={false} className="absolute bottom-12 right-0 w-96 p-4 bg-white border rounded shadow-lg">
        <Chatbot />
      </PopoverPanel>
    </Popover>
  )
}
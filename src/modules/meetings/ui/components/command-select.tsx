import { Button } from "@/components/ui/button";
import { CommandEmpty,CommandInput,CommandItem,CommandList,CommandResponsiveDialog } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState,ReactNode } from "react";

interface Props{
    options:Array<{
        id:string,
        value:string,
        children:ReactNode
    }>
    onSelect:(value:string)=>void;
    onSearch?:(value:string)=>void;
    value:string;
    className?:string;
    placeholder?:string;
    isSearchable?:boolean;
}

export const CommandSelect = ({options,onSelect,onSearch,value,placeholder='Select an option',className}:Props)=>{
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption=options.find((option)=>option.value===value);

    const handleOpenChange=(open:boolean)=>{
        onSearch?.("");
        setIsOpen(open);
    }

    return (
        <>
        <Button onClick={()=>setIsOpen(true)}
         type="button"
        variant="outline"
        className={cn("h-9 justify-between font-normal px-2",
            !selectedOption && "text-muted-foreground",
            className,
        )}
        >
            <div>
                {selectedOption?.children ?? placeholder}
            </div>
            <ChevronsUpDownIcon/>
        </Button>
        <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={isOpen}
        onOpenChange={handleOpenChange}
        >
            <CommandInput placeholder="Search..." onValueChange={onSearch}/>
            <CommandList>
                <CommandEmpty>
                    <span className="text-muted-foreground text-sm">
                            No option found
                    </span>
                </CommandEmpty>
                {options.map((option)=>(
                    <CommandItem key={option.id} onSelect={()=>{
                        onSelect(option.value);
                        setIsOpen(false);
                    }}>
                        {option.children}
                    </CommandItem>
                ))}
            </CommandList>
        </CommandResponsiveDialog>
        </>
    )
}
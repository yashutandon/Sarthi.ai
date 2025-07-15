import { CircleCheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const pricingCardVariants = cva(
  "rounded-2xl p-6 w-full border transition-shadow hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-neutral-200 dark:bg-neutral-900 dark:text-white dark:border-neutral-800",
        highlighted:
          "bg-gradient-to-br from-[#093C23] to-[#051B16] text-white border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconVariants = cva("size-5 shrink-0", {
  variants: {
    variant: {
      default: "text-white fill-primary dark:fill-primary dark:text-white",
      highlighted: "text-black fill-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const secondaryTextVariants = cva("text-sm", {
  variants: {
    variant: {
      default: "text-neutral-700 dark:text-neutral-400",
      highlighted: "text-neutral-300",
    },
  },
});

const badgeVariants = cva("px-2 py-0.5 rounded text-xs font-semibold", {
  variants: {
    variant: {
      default:
        "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary",
      highlighted: "bg-[#F5B797] text-[#5B2B20]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props extends VariantProps<typeof pricingCardVariants> {
  badge?: string | null;
  price: number;
  features: string[];
  title: string;
  description?: string | null;
  priceSuffix: string;
  className?: string;
  buttonText: string;
  onClick: () => void;
}

export const PricingCard = ({
  variant,
  badge,
  price,
  features,
  title,
  description,
  priceSuffix,
  className,
  buttonText,
  onClick,
}: Props) => {
  return (
    <div className={cn(pricingCardVariants({ variant }), className)}>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h6 className="text-xl font-semibold">{title}</h6>
            {badge && (
              <Badge className={cn(badgeVariants({ variant }))}>{badge}</Badge>
            )}
          </div>
          {description && (
            <p className={cn(secondaryTextVariants({ variant }))}>
              {description}
            </p>
          )}
        </div>

        <div className="flex items-end gap-1 shrink-0">
          <h4 className="text-3xl font-semibold">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(price)}
          </h4>
          <span className={cn("text-sm", secondaryTextVariants({ variant }))}>
            {priceSuffix}
          </span>
        </div>
      </div>

      <Separator className="my-6 opacity-10 bg-[#5D6B68] dark:bg-white/10" />

      <Button
        className="w-full"
        size="lg"
        variant={variant === "highlighted" ? "default" : "outline"}
        onClick={onClick}
      >
        {buttonText}
      </Button>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide">Features</p>
        <ul className={cn("space-y-2.5", secondaryTextVariants({ variant }))}>
          {features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2.5 text-sm">
              <CircleCheckIcon className={cn(iconVariants({ variant }))} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

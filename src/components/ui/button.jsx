import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { GlowingShadow } from "../glowing-shadow"
import { buttonVariants } from "./button-variants"

import { cn } from "@/lib/utils"

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <GlowingShadow variant="primary" className="rounded-lg">
          <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
    </GlowingShadow>
  )
}

export { Button }

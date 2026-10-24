import type { ReactNode } from "react";

import FloatingLabelInput from "./floatingLabelInput";
import TextInput, { type TextInputProps } from "./textInput";

type InputProps = TextInputProps & { floating?: boolean };

export default function Input({
    floating = false,
    ...props
}: Readonly<InputProps>): ReactNode {
    if (floating) {
        return <FloatingLabelInput {...props} />;
    }
    return <TextInput {...props} />;
}

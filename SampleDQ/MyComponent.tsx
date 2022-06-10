import { Label } from "@fluentui/react";
import * as React from "react";

export interface ILineItems {
    value: string | number
}

export const MyComponent = React.memo(({ value }: ILineItems): JSX.Element => {
    return (<p>Record Count: {value}</p>)
})


import { useState, useEffect } from "react";
import { Param } from "../types/Param";

export const useParamUpdater = (actionId: string, parameter: Param, onParameterChange: (value: number) => void = (v: number) => {}) => {
    const [param, updateParam] = useState(parameter);
    const [value, setValue] = useState(0.0);

    const sendToPlugin = function (msg: Param) {
        (window as any).ipc.postMessage(JSON.stringify({type: actionId, value: msg.value}));
    };

    useEffect(() => {
        sendToPlugin(param);
    }, [param]);

    const updater = (v: number) => {
        updateParam({value: v});
    };

    (window as any).onPluginMessage = (msg: any) => {
        switch (msg.action) {
            case actionId: {
                setValue(msg.value);
                onParameterChange(msg.value);
                break;
            }
        }
    };

    return [value, updater] as const;
};

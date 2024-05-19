import Block from "../Block";
import AICoder from "./AICoder";
import Compiler from "./Compiler";
import { pre, post } from './snippets';
export class Server {

    constructor(public serverUrl: string,) { };

    async uploadWidgets(block: Block, useAI?: boolean): Promise<Record<string, string>> {
        const compiledCode = Compiler.compileBlock(block);
        if (!useAI) {
            return {
                code: pre + compiledCode + post
            }
        }
        const res = await AICoder.processCode(compiledCode)
        return {
            code: res
        };
    }

    async renderChanges(): Promise<void> {
        await fetch(this.serverUrl + "/render/");
    }

    downloadCompiledCode(type: 'web' | 'apk' | 'aab' | 'linux'): void {
        location.href = this.serverUrl + "/build/" + type;
    }

}
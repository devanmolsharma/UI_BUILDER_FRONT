import Block from "../Block";
import Compiler from "./Compiler";

export class Server {

    constructor(public serverUrl: string,) { };

    async uploadWidgets(block:Block): Promise<void> {
        await fetch(this.serverUrl + "/update", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              newCode: Compiler.compileBlock(block),
            }),
          });
    }

    async renderChanges(): Promise<void> {
        await fetch(this.serverUrl + "/render/");
    }

    downloadCompiledCode(type: 'web' | 'apk' | 'aab' | 'linux'): void {
        location.href = this.serverUrl + "/build/" + type;
    }
    
}
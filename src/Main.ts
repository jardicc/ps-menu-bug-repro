import { openDialog } from "./mainPanelIndex";

import {app, constants} from "photoshop";
import {Document} from "photoshop/dom/Document";

export class Main{
	public static start(): void {
		void alert("This is internal build not intended for public use.");
		
		setTimeout(async () => {
			console.log("Timeout");
		}, 10000);
	}

	private static _doc: Document | null = null;


	public static get doc(): Document {
		if (!this._doc) {
			throw new Error("Document is not initialized.");
		}
		return this._doc;
	}


	public static async initDialog(): Promise<boolean> {
		this._doc = app.activeDocument;
		const valid = await this.validateDocument();
		return valid;
	}

	public static async destroyDialog(): Promise<void> {
	}

	private static async validateDocument(): Promise<boolean> {
		
		if (!Main._doc) {
			await alert("Please open a document first.");
			return false;
		}
		if(Main._doc.mode !== constants.DocumentMode.RGB){
			await alert("Please convert your document to RGB mode.");
			return false;
		}
		if(Main._doc.bitsPerChannel !== constants.BitsPerChannelType.EIGHT){
			await alert("Please convert your document to 8 bit mode.");
			return false;
		}
		return true;
	}
}

function run() {	

	document.addEventListener("uxpcommand", (event:any) => {
		console.log(event);
		switch (event.commandId) {
			case "resetStateFn":
				console.log("resetStateFn");
				break;
			case "runDialog": {
				void openDialog();
				break;
			}
		}
	});
	Main.start();
}

run();
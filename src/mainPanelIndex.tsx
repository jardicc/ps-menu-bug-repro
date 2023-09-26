// eslint-disable-next-line react/no-deprecated
import ReactDOM from "react-dom/client";
import React from "react";
import {Main} from "./Main";
import {app, core} from "photoshop";
import {MainPanel} from "./MainPanelContainer";


export async function openDialog(): Promise<void> {

	const valid = await Main.initDialog();
	if (!valid) {
		return;
	}

	await core.executeAsModal(async (cx) => {
		const suspension = await cx.hostControl.suspendHistory({documentID: app.activeDocument.id, name: "Test Plugin"});
		await cx.hostControl.resumeHistory(suspension, false);		
	}, {
		commandName: "Test Plugin",
	});

	
	const dialogNode = findDialogNode();

	const reactRootNode = ReactDOM.createRoot(dialogNode);

	reactRootNode.render(
		<MainPanel />,
	);

	console.log("Show dialog");
	const res: any = await dialogNode.uxpShowModal({
		title: "Test Plugin",
		resize: "both",
		lockDocumentFocus: true,
		size: {
			width: 800,
			height: 600,
		},
	});
	console.log("Hide dialog: " + res);
	reactRootNode.unmount();

	if (res.options && res.thresholds) {
		await core.executeAsModal(async (cx) => {
			const suspension = await cx.hostControl.suspendHistory({documentID: app.activeDocument.id, name: "Test Plugin"});
			// await processImage(res.options as TOptions, res.thresholds as IThreshold[], cx);
			await cx.hostControl.resumeHistory(suspension);
		}, {
			commandName: "Test Plugin",
		});
	}
	
	await Main.destroyDialog();
}

export async function closeDialog(options: any | null, thresholds: any[] | null): Promise<any> {
	const el = findDialogNode();
	await el.close({options, thresholds});
}

function findDialogNode() {
	const el:any = document.querySelector("[id=mainPanel]");
	if (!el) {
		void alert("Could not find dialog node");
		console.error(el);
	}
	return el;
}

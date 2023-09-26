import React from "react";


export class MainPanel extends React.Component<any, any> { 
	constructor(props: any) {
		super(props);
	}

	
	public componentDidUpdate(): void {
		// if (prevProps.preview !== this.props.preview && prevProps.preview) {
		setTimeout(() => {
			URL.revokeObjectURL("");
			console.log("revoke old url: " + "");
		}, 10);
		// }
	}

	public componentWillUnmount(): void {
		//
	}

	public render(): JSX.Element {


		return (
			<div className={"MainPanel"} style={{color:"white", fontSize: "20px"}}>
				Nothing to see here
			</div>
		);
	}
}

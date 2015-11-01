class MyReactComponent extends React.Component {
    
    constructor(props) { 
        super(props);
        
        // defulte 
        this.state = {
            options: []
        };
        
        // updata after get data
//         new Promise().then(function(data) {
//             this.setState({
//                 options: Object.keys(data)
//             });
//         }
//         .bind(this));
    
    }
    
    componentDidMount() {
    }
    
    click_option(name) {
        console.log('MyReactComponent')
    }
     
    render() {
            return React.createElement("div", null, 
                    React.createElement("button", {onClick: () => this.click_option(this.state.options)}, "MyReactComponent"), 
                    React.createElement("style", null, this.state.css), 
                    React.createElement("my-result", {dangerouslySetInnerHTML: {__html:this.state.html}}), 
                    React.createElement("my-options", {class: "options"}, 
                       this.state.options.map((item) =>
                            React.createElement("div", null, item)
                       )
                    )
                   );
    }

}

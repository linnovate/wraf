
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
            return <div>
                    <button onClick={() => this.click_option(this.state.options)}>MyReactComponent</button>
                    <style >{this.state.css}</style>
                    <my-result dangerouslySetInnerHTML={{__html:this.state.html}}></my-result>          
                    <my-options  class="options">
                       {this.state.options.map((item) =>
                            <div>{item}</div>
                       )}
                    </my-options>
                   </div>;
    }

}

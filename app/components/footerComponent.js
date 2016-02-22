

class MyStyle extends React.Component {
  render() {
    return <my-style dangerouslySetInnerHTML={{__html:this.props.style}}></my-style>;
  }
}



class GUI_myCss extends React.Component {

    constructor(props) {
        super(props);

      
        this.state = {
            html: "<article><img src='img.jpg'/><div contenteditable class='captcha'><h3>Title</h3><div>some text</div></div><i></i></article>",
            css: '',
            style: '',
            options: []
        }
    }

    componentDidMount() {
        console.log('called `componentDidMount` from MyButton');
    }

    click_option(name) {
     
    }

    render() {
        return <div>
                <style>{this.state.css}</style>
                <my-result dangerouslySetInnerHTML={{__html:this.state.html}}></my-result>          
                <my-options class="options">
                   {this.state.options.map((item) =>
                        <button onClick={() => this.click_option(item)}>{item}</button>
                   )} 
                </my-options>
                <MyStyle {...this.state} />
            </div>;
    }

}


React.render(<GUI_myCss/>, document.getElementsByTagName('app-content')[0]);

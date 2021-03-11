import React, { Component } from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Controller from "./components/Controller";
import "./App.css";

//class ver.
//컴포넌트(사용자가 만드는 태그, 함수 개념)를 만드는 코드
//컴포넌트는 반드시 하나의 최상위 태그로 시작(최상위 태그는 한개) -> div
class App extends Component {
  //컴포넌트 실행 시, 제일 먼저 수행되면서 컴포넌트 초기화 담당하는 메소드
  constructor(props) {
    super(props);
    this.state = {
      mode: "welcome",
      welcome: { title: "Welcome", desc: "Hello, React!!!" },
      subject: { title: "WEB", sub: "World Wide Web" },
      contents: [
        { id: 1, title: "HTML", desc: "HTIML is for information" },
        { id: 2, title: "CSS", desc: "CSS for design" },
        {
          id: 3,
          title: "JavaScript",
          desc: "JavaScript is for interative",
        },
      ],
      selected_content_id: 1,
    };
    this.max_content_id = this.state.contents.length;
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        //break;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title,
      _desc,
      _article,
      _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      //add content to this.state.contents
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            //기존 데이터 contents를 직접적으로 바꾸지 않고, 변수에 넣어서 사용(push 대신 concat 사용)
            /*
          var _content = this.state.contents.concat({
            id: this.max_content_id,
            title: _title,
            desc: _desc,
          });
          */
            //기존 데이터 contents를 복제해서 사용(Array.from) -> push 사용해도 비교 가능
            //배열이 아닌 객체를 복제하는 경우 -> Object.assign({$추가할 내용$}, 복제대상)
            var _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });

            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }
  //props의 값이나 state값이 바뀌면 해당 컴포넌트 호출(화면 다시 그려짐)
  render() {
    console.log("App render");

    return (
      <div className="App">
        {/*
        props : 컴포넌트 외부 속성(컴포넌트 사용 시) -> Subject 컴포넌트의 title, sub 등
        state : 컴포넌트 내부 속성(컴포넌트 구현 시)
        */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: "welcome",
            });
          }.bind(this)}
        ></Subject>
        <TOC
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
        ></TOC>
        <Controller
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("Are you sure you want to delete?")) {
                //delete 작업
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("deleted!");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Controller>
        {this.getContent()}
      </div>
    );
  }
}

//function ver.
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;

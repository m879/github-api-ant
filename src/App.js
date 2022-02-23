import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css'; 
import {Layout,Table,Input} from 'antd';
const {Content } = Layout;
const { Search } = Input;

function App() {

  const [allRepo, setallRepo] = useState([]);

  const [searchText, setsearchText] = useState('m879');

  const columns = [
    {
      title: `Repository Name ( ${searchText} )`,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Star',
      dataIndex: 'stargazers_count',
      key: 'stargazers_count',
    }
  ];

  useEffect(() => {
    if(searchText){
      axios.get(`https://api.github.com/users/${searchText}/repos`)
      .then((res)=>{
        setallRepo(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      setallRepo([]);
      setsearchText('m879')
    }
  }, [searchText]);


  return (
    <Layout className="layout">
    <Content style={{ padding: '50px' }}>
      <div style={{margin:'10px 0px'}}>
          <Search placeholder="GitHub Username" onChange={(e)=>setsearchText(e.target.value)} 
          style={{ width: '50vw' }} />
      </div>
      <div className="site-layout-content">
      <Table dataSource={allRepo} columns={columns} />
      </div>
    </Content>
  </Layout>
  );
}

export default App;

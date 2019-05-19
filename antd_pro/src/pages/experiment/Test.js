import React from "react"
import {connect} from 'dva';


import {
	Row,
	Col,
	Button,
	Table
} from "antd";	

const { Column, ColumnGroup } = Table;

@connect(({ home, loading }) => ({  // 连接home.js文件
	home,
	loading: loading.models.home,
  }))

class PCBody extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
		const { dispatch } = this.props;
	//settimeout为模拟数据延迟
		setTimeout(() => {
			dispatch({
				type: 'home/fetch',
			  });
		  }, 2000);
		// dispatch({
		//   type: 'home/fetch',
		// });
	  }
	render() {
		const columns = [{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				width: '20%',
				
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
				width: '10%',
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
				width: '50%',
			}
		];
		// const data = [{
		// 	key:'1',
		// 	name:'xiaoming',
		// 	age:16,
		// 	address:'1h'
		//   }, {
		// 	key:'2',
		// 	name:'wanglihong',
		// 	age:28,
		// 	address:'2b'
		//   },
		//   {
		// 	key:'3',
		// 	name:'caoxueqing',
		// 	age:49,
		// 	address:'13d'
		// }];
		const { home: { list } } = this.props;
		const dataSource = [...list];
		return (
			<div>

				<Table dataSource={dataSource}  columns={columns} >
					{/* <Column title="Name" dataIndex="name" key="name" width="300px" />
					<Column title="Age" dataIndex="age" key="age" width="200px"/>
					<Column title="Address" dataIndex="address" key="address" width="1000px"/> */}
				</Table>,
				{/* <Table dataSource={data}>
					<Column title="Name" dataIndex="name" key="name" width={300}/>
					<Column title="Age" dataIndex="age" key="age" width={400}/>
					<Column title="Address" dataIndex="address" key="address" width={1000}/>
				</Table>, */}
			</div>
			)
	}
}


export default PCBody;
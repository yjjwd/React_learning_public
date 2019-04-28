import React from "react"
import {
	Row,
	Col
} from "antd";
import {
	Button
} from 'antd';

import {
	Table
} from 'antd';

// class Home extends Component {
//   render() {
//     const columns = [{
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     }, {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//     }, {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//     }];

//     return (
//       <div>
//         <Table
//           bordered
//           dataSource={dataSource}
//           columns={columns}
//           size="small" />
//       </div>
//     );
//   }
// }

// export default Home;


class PCBody extends React.Component {
	constructor() {
		super();
	}
	render() {
		const columns = [{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address',
			}
		];
		const dataSource = [{
			key:'1',
			name:'xiaoming',
			age:16,
			address:'1h'
		  }, {
			key:'2',
			name:'wanglihong',
			age:28,
			address:'2b'
		  },
		  {
			key:'3',
			name:'caoxueqing',
			age:49,
			address:'13d'
		}];
		return (
			// 	<div>
			// 		<Row span={10}>
			// 		<Col span={11}></Col>
			// 		<Button type="primary">Primary</Button>
			// 		<Button>Default</Button>
			// 		<Button type="dashed">Dashed</Button>
			// 		<Button type="danger">Danger</Button>
			// 		<Col span={11}></Col>
			// 		</Row>
			//   </div>
			<div>
			<Row>
			<Col span={2}></Col>
			  <Table
			    bordered='true'
				dataSource={dataSource}
				columns={columns}
				size="small" />
			<Col span={2}></Col>
			</Row>
			</div>

		)

	}


}


export default PCBody;
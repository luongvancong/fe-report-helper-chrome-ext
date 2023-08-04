import { useState } from 'react';
import './Popup.css';

const assignees: any = {
  'Nguyen Van Do': 'Nguyễn Văn Đỏ',
  'Trần Hùng': "Trần Hùng",
  'Vân Anh Nguyễn': 'Nguyễn Thị Vân Anh',
  'Đông Vi': 'Vi Trường Đông',
  'Nguyễn Hoàng Quân': 'Nguyễn Hoàng Quân',
  'Hoàng Thanh Tùng': 'Hoàng Thanh Tùng',
  'Trần Long Vũ': 'Trần Long Vũ',
  'Đặng Thành Long': 'Đặng Thành Long',
  'Phan Trung Điền': 'Phan Trung Điền',
  'vũ ngọc nga': 'Vũ Thị Nga',
  'Trịnh Vũ Hoàng Linh': 'Trịnh Vũ Hoàng Linh',
  'thinb': 'thinb'
}

const keys = Object.keys(assignees);
const assigneeOptions: Array<any> = []
for (let i = 0; i < keys.length; i ++) {
  assigneeOptions.push({
    value: keys[i],
    name: assignees[keys[i]]
  })
}



function App() {
  const [crx, ] = useState('create-chrome-ext')
  const [assignee, setAssignee] = useState('')
  const [pageInfo, setPageInfo] = useState({
    name: ""
  })

  const handleCountTotalBug = () => {
    // @ts-ignore
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs: any) {
      const message = {
        command: "COUNT_TOTAL_BUG",
        payload: {
          assignee
        }
      }

      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, message, function(response: any) {
        alert(response.totalBug);
      });
    });
  }

  const handleCrawlInfo = () => {
    // @ts-ignore
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs: any) {
      const message = {
        command: "GET_US_NAME",
        payload: {}
      }

      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, message, function(response: any) {
        console.log('response', response)
        setPageInfo({
          ...pageInfo,
          name: response.name
        })
      });
    });
  }

  return (
    <main>

      <div className='mb-4'>
        <label className='mr-3'>Assignee</label>
        <select onChange={e => setAssignee(e.target.value)}>
          <option value="">---</option>
          {assigneeOptions.map(x => (
            <option value={x.value} selected={assignee === x.value}>{x.name}</option>
          ))}
        </select>

      </div>

      <button
        onClick={handleCountTotalBug}
        className="block w-full bg-blue-400 text-white text-center mb-4">Count Total Bug</button>

      <button
        onClick={handleCrawlInfo}
        className="block w-full bg-pink-400 text-white text-center mb-4"
      >Crawl Info</button>

      <div className='border rounded border-pink-300 border-[1px]'>
          US Name: {pageInfo.name}
      </div>

      <a href="https://www.npmjs.com/package/create-chrome-ext" target="_blank">
        Power by {crx}
      </a>
    </main>
  )
}

export default App

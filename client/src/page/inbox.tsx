import { date } from 'zod'
import inbox from '../assets/icons/acct/empty-mail.svg'
import WarningIcon from '@mui/icons-material/Warning'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ErrorIcon from '@mui/icons-material/Error'
import { timeDifference, dateFormat } from './timeFunction.js'
import { CheckBox } from '@mui/icons-material'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

export default function Inbox() {
  const d = Date.now()
  const [data, setData] = useState<any>()
  const { currentUser } = useSelector((state: any) => state.user)

  useEffect(() => {
    axios
      .get(`/api/notifications/out/${currentUser.email}`)
      .then((res: any) => {
        setData(res.data)
      })
      .catch(() => {
        toast.error('An error occurred')
      })
  }, [])

  return (
    <>
      <div className="mtg bbot">
        <h3>Inbox Messages({data ? data.length : '0'})</h3>
      </div>
      <div className="container" style={{ height: '435px', overflowY: 'auto' }}>
        {data &&
          data.map((d: any) => {
            return (
              <div className="content-box">
                <div className="content-title">
                  <div className="content-title-body">
                    <span>{d.title}</span>
                    <span>
                      {d.icon == 'success' && (
                        <CheckBox sx={{ color: 'green', fontSize: '20px' }} />
                      )}
                      {d.icon == 'warning' && (
                        <WarningIcon
                          sx={{ color: '#c68827', fontSize: '20px' }}
                        />
                      )}
                      {d.icon == 'danger' && (
                        <ErrorIcon sx={{ color: 'red', fontSize: '20px' }} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="content-body">{d.message}</div>
                <div className="content-footer">
                  <div className="content-footer-body">
                    <small className="text-muted">
                      {dateFormat(1740829103780)}
                    </small>
                    <small className="text-muted">
                      {timeDifference(1740829103780)}
                    </small>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

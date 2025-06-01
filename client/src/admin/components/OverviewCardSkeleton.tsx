import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

export const OverviewCardSkeleton = ({ count }: any) => {
  return (
    <div className="row gap-4 gap-md-0 mb-5">
      {Array(count)
        .fill(0)
        .map((_, i) => {
          return (
            <div className="col-lg-4" key={i}>
              <Box
                sx={{
                  border:
                    i == 0
                      ? '2px solid #cef9dd'
                      : i == 1
                        ? '2px solid #dfdeff'
                        : '2px solid #f0cece',
                  borderRadius: '10px',
                  backgroundColor: '#f2f2f2',
                  boxShadow: 'rgba(0,0,0,0.35) 0px 5px 15px',
                }}
              >
                <div className="px-3 mt-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column gap-3 w-100">
                    <Skeleton sx={{ width: '35%', height: '30px' }} />

                    <Skeleton sx={{ width: '60%', height: '40px' }} />
                  </div>
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: '40px', height: '40px' }}
                  />
                </div>
                <hr />
                <center>
                  <Skeleton sx={{ width: '70%', marginBottom: '15px' }} />
                </center>
              </Box>
            </div>
          )
        })}{' '}
    </div>
  )
}

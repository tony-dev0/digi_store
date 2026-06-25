import Skeleton from '@mui/material/Skeleton'

const ProductCardSkeleton = ({ type, count }: any) => {
  return type == 'featured'
    ? Array(count)
        .fill(0)
        .map((_, i) => {
          return (
            <div key={i}>
              <div className="f_item">
                <Skeleton variant="rectangular" width={185} height={94} />
                <center>
                  <Skeleton sx={{ width: '50%' }} />
                </center>
                <center>
                  <Skeleton
                    className="px-5 py-2 my-2"
                    variant="rectangular"
                    sx={{ width: '70%', height: '25px' }}
                  />
                </center>
              </div>
            </div>
          )
        })
    : type == 'desc'
      ? Array(count)
          .fill(0)
          .map((_, i) => {
            return (
              <div key={i} className="row justify-content-center gap-4">
                <div className="img-content col-lg-4 py-3">
                  <Skeleton variant="rectangular" width={300} height={300} />
                  <div className="img-slider p-1">
                    <Skeleton variant="rectangular" width={55} height={55} />
                    <Skeleton variant="rectangular" width={55} height={55} />
                    <Skeleton variant="rectangular" width={55} height={55} />
                    <Skeleton variant="rectangular" width={55} height={55} />
                  </div>
                </div>
                <div className="col-lg-4 py-3">
                  <Skeleton height={42} />
                  <div className="py-2 d-flex align-items-center gap-2">
                    <small>Market:</small>
                    <Skeleton sx={{ width: '100%' }} />
                  </div>
                  <div className="my-3">
                    <Skeleton height={30} />
                  </div>
                  <h6>Description</h6>
                  <hr style={{ opacity: 0.7 }} />
                  <div className="descx">
                    <Skeleton height={210} />
                  </div>
                </div>
              </div>
            )
          })
      : Array(count)
          .fill(0)
          .map((_, i) => {
            return (
              <div key={i}>
                <div className="f_item">
                  <Skeleton variant="rectangular" width={185} height={160} />
                  <div className="ps-2 pb-3">
                    <Skeleton sx={{ width: '90%', height: '35px' }} />
                  </div>
                  <div className="ps-2">
                    <Skeleton sx={{ width: '30%' }} />
                    <Skeleton sx={{ width: '30%' }} />
                  </div>
                  <center>
                    <Skeleton
                      className="px-5 py-2 my-2"
                      variant="rectangular"
                      sx={{ width: '70%', height: '25px' }}
                    />
                  </center>
                </div>
              </div>
            )
          })
}
export default ProductCardSkeleton

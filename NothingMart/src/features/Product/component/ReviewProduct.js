import React from 'react';

function ReviewProduct({ data }) {
  const { title, reviews } = data;
  return (
    <>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="tab-pane-3">
          <div className="row">
            <div className="col-md-6">
              <h4 className="mb-4"> Review for "{title}"</h4>

              {reviews?.map((item, index) => (
                <div
                  className="media mb-4 p-1"
                  style={{ border: 'solid 1px' }}
                  key={index}
                >
                  {/* <img
              src="img/user.jpg"
              alt="User"
              className="img-fluid mr-3 mt-1"
              style={{ width: 45 }}
            /> */}
                  <div className="media-body">
                    <h6>
                      {item.reviewerName}
                      <small>
                        - <i>{item.date}</i>
                      </small>
                    </h6>

                    <div className="text-primary mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={
                            i < Math.floor(item.rating)
                              ? 'fas fa-star'
                              : i < item.rating
                              ? 'fas fa-star-half-alt'
                              : 'far fa-star'
                          }
                        />
                      ))}
                    </div>
                    <p>
                      Diam amet duo labore stet elitr ea clita ipsum, tempor
                      labore accusam ipsum et no at. Kasd diam tempor rebum
                      magna dolores sed sed eirmod ipsum.
                    </p>
                    <h7>{item.reviewerEmail}</h7>
                  </div>
                </div>
              ))}
            </div>
            {/* Own Review */}
            <div className="col-md-6">
              <h4 className="mb-4">Leave a review</h4>
              <small>
                Your email address will not be published. Required fields are
                marked *
              </small>
              <div className="d-flex my-3">
                <p className="mb-0 mr-2">Your Rating * :</p>
                <div className="text-primary">
                  <i className="far fa-star" />
                  <i className="far fa-star" />
                  <i className="far fa-star" />
                  <i className="far fa-star" />
                  <i className="far fa-star" />
                </div>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="message">Your Review *</label>
                  <textarea
                    id="message"
                    cols={30}
                    rows={5}
                    className="form-control"
                    defaultValue={''}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group mb-0">
                  <input
                    type="submit"
                    defaultValue="Leave Your Review"
                    className="btn btn-primary px-3"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewProduct;

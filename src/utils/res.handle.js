export const successRes = ({
  res,
  message = "success",
  status = 200,
  data = {},
}) => {
  return res.status(status).json({
    message,
    data,
  });
};

export const errorRes=({
    res,
    message="something went wrong",
    status=500
}) =>{
    throw new Error(message,{
        cause:{
            status
        }
    })
}

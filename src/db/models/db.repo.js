export const findById = async ({
  model,
  id,
  select = " ",
  options = {},
}) => {
  
  const query = model.findOne({ _id: id }).select(select);

  if (options.populate) {
    query.populate(options.populate);
  }

  if (options.lean) {
    query.lean();
  }

  const doc = await query;
  return doc;
};

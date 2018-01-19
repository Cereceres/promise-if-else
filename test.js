const limitOfUserByRequest = 10;

exports.findAllUsers = function(req, res) {
    let data = undefined;
    const query = req.query || {};
    User.find(query)
        .limit(limitOfUserByRequest)
        .sort({ _id: -1 })
        .exec()
        .then((_data) => {
            data = _data;
            return User.count({ _id:{ $gt:data[data.length - 1]._id } });
        })
        .then((count) => {
            if (count) return res.json({
                success: true,
                data,
                next:{
                    _id:{
                        $gt:data[data.length - 1]._id
                    }
                }
            });

            res.json({
                success: true,
                data,
            });
        })
        .catch((err) => {
            res.json({ success: false, data: err });
        });
};

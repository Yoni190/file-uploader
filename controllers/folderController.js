exports.createView = [
    (req, res) => {
        res.render('add_folder', {
            title: 'Create Folder'
        })
    }
]
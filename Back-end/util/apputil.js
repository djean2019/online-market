/** 
 * @author Darphe HYPPOLITE JEAN
 *
 * App Utilities
 */
const AdminModel = require('../model/admin').adminModel
const bcrypt = require('../util/bcrypt')

module.exports = {
    populateAdmin: function (onComplete) {
        let admin = new AdminModel({ fullname: 'Darphe H. J.', email: 'darphe@onlinemarket.com', password: bcrypt.encodeSync('1234567') })
        // let admin = new AdminModel({ fullname: 'Super Admin', email: 'super@onlinemarket.com', password: '1234567' })
        AdminModel.exists({ email: admin.email })
            .then(res => {
                if (res) {
                    onComplete(`admin Already available ${Date.now()}`)
                } else {
                    admin.save()
                    onComplete(`admin created - ${Date.now()}`)
                }
            }).catch(err => onComplete(`admin failed to create`))
    }
}
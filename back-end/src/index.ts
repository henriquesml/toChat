import 'module-alias/register'
import { MongoHelper } from '@/infra/repository'
const Gun = require('gun')

const port = process.env.PORT || 3333

MongoHelper.connect(String(process.env.MONGO_URI))
  .then(async() => {
    const app = (await import('./main/config/app')).default
    app.use(Gun.serve)
    const server = app.listen(port, () => console.log('Server running at http://localhost:3333'))
    Gun({ web: server })
  })
  .catch(console.error)

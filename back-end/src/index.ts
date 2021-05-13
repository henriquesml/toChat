import 'module-alias/register'
import { MongoHelper } from '@/infra/repository'

MongoHelper.connect(String(process.env.MONGO_URI))
  .then(async() => {
    const app = (await import('./main/config/app')).default
    app.listen(3333, () => console.log('Server running at http://localhost:3333'))
  })
  .catch(console.error)

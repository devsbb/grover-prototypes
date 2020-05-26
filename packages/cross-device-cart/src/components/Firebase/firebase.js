const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

class Firebase {
  static __instance = null
  constructor(app) {
    if (!Firebase.__instance) {
      Firebase.__instance = this

      app.initializeApp(config)

      this.auth = app.auth()
      this.db = app.database()
    }
    return Firebase.__instance
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then(snapshot => {
            const dbUser = snapshot.val()

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            }

            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.ref("users")

  // *** Order API ***

  orders = () => this.db.ref(`orders`)

  order = uid => this.db.ref(`orders/${uid}`)
}

function initFirebase() {
  let instance = null
  return app => {
    if (instance) {
      return instance
    }
    instance = new Firebase(app)
    Object.freeze(instance)
    return instance
  }
}

const getFirebase = initFirebase()

export default getFirebase

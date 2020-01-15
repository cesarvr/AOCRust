const { spawn } = require('child_process');
const fs = require('fs')
const PASSWORD = process.env['PASSWORD'] || 'mypassword'
const KEYSTORE = process.env['KEYSTORE'] || 'keystore.jks'


const createCerts = (_next) => {
  let next = _next || function() { console.log('Nothing more to do...') }

  if (fs.existsSync(`./${KEYSTORE}`)) {
    fs.unlinkSync(`./${KEYSTORE}`)
  }

  let args = ['-keystore', KEYSTORE, '--keyalg', 'RSA', '-genkey', '-alias', 'sso-test', '-deststoretype', 'pkcs12']
  const keytool = spawn('keytool', args)

  keytool.stderr.on('data', function(data) {
    if(data.includes('password:')) {
      keytool.stdin.write(`${PASSWORD}\n`)
    }

    if(data.includes('name') || data.includes('country')) {
      keytool.stdin.write('Larry E.\n')
    }

    if(data.includes('[no]')) {
      keytool.stdin.write('yes\n')
      clearTimeout(timer)
    }
  })

  keytool.on('exit', (code) => {
    //console.log(`bye! 🚀`);
    console.log('importing Certs')
    next()
  })
}

const importCerts = (certs_list) => {
  if(certs_list.length === 0){
    console.log(`We done here! 🚀`)
    process.exit(1)
  }


  let cert = certs_list.pop()
  console.log(`Adding certificate: ${cert}`)
  const keytool = spawn('keytool', ['-import', '-keystore', 'sso.jks', '-file', cert, '-alias', 'sso'])

  keytool.stderr.on('data', function(data) {
    console.log(`stderr: ${data}`);
    if(data.includes('Enter keystore password:')) {
      keytool.stdin.write(`${PASSWORD}\n`)
    }

    if(data.includes('Re-enter new password:')) {
      keytool.stdin.write(`${PASSWORD}\n`)
    }

    if(data.includes('Trust this certificate?')) {
      keytool.stdin.write('yes\n')
    }
  })

  keytool.on('exit', function(code) {
    console.log(`bye! 🚀`);
    importCerts(certs_list)
  })
}


createCerts( () => process.exit(0))

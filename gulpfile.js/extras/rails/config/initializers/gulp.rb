GULP_CONFIG = JSON.parse(File.read('gulpfile.js/config.json'))
REV_MANIFEST_PATH = File.join(GULP_CONFIG['root']['dest'], 'rev-manifest.json')

if File.exist?(REV_MANIFEST_PATH)
  REV_MANIFEST = JSON.parse(File.read(REV_MANIFEST_PATH))
end

GULP_CONFIG = JSON.parse(File.read('gulpfile.js/config.json'))
rev_manifest_path = File.join(GULP_CONFIG['root']['dest'], 'rev-manifest.json')

if File.exist?(rev_manifest_path)
  REV_MANIFEST = JSON.parse(File.read(rev_manifest_path))
end

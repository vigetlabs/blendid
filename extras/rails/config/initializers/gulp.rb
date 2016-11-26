ASSET_PATH_CONFIG = JSON.parse(File.read('config/path-config.json'))
REV_MANIFEST_PATH = File.join(ASSET_PATH_CONFIG['dest'].gsub("..", "."), 'rev-manifest.json')

if File.exist?(REV_MANIFEST_PATH)
  REV_MANIFEST = JSON.parse(File.read(REV_MANIFEST_PATH))
elsif !Rails.env.development? && !Rails.env.test?
  raise "rev-manifest.json can not be found at path: #{REV_MANIFEST_PATH} and is required in non-development environments"
end

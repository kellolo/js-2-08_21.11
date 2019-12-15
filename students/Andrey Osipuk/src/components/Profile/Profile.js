import ProfileImage from 'components/ProfileImage'
import ProfileBio from 'components/ProfileBio'
import ProfileUserSettings from 'components/ProfileUserSettings'
import ProfileStats from 'components/ProfileStats'

export default {
  name: 'Profile',
  components: {
    ProfileImage,
    ProfileBio,
    ProfileUserSettings,
    ProfileStats
  },
  data() {
    return {
      // realname: 'realname',
      // bio: 'bio'
    };
  }
}
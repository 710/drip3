import Image from 'next/image'
import ActionMenu from '@drip3/react-lib/components/ActionMenu'
import Post from '@drip3/react-lib/components/Post'
import EditButton from '@drip3/react-lib/components/EditButton'
import { splitName } from '@drip3/lib/utils'
import { Textarea } from '@drip3/react-lib/components/ui/Textarea'
import {
  RadioGroup,
  RadioGroupItem,
} from '@drip3/react-lib/components/ui/RadioGroup'

const colors = [
  'bg-purple',
  'bg-orange',
  'bg-magenda',
  'bg-green',
  'bg-blue',
  'bg-yellow',
]

const SideSection = ({ children }: { children: React.ReactNode }) => (
  <nav className="w-screen h-auto md:w-96 md:sticky md:top-0 md:h-screen md:flex md:justify-between md:flex-col">
    <div className="md:flex-1">{children}</div>
    <ActionMenu />
  </nav>
)

const MainSection = ({ children }: { children: React.ReactNode }) => (
  <main className="flex-1 min-w-0 overflow-auto">{children}</main>
)

type Props = {
  profile: any
  credential?: any
  posts?: any
  uid: string
  mode?: 'edit' | 'view'
}

export default function UserPage({
  profile,
  uid,
  credential,
  posts,
  mode = 'view',
}: Props) {
  const displayName = splitName(uid)

  return (
    <>
      <div className="min-h-screen flex container mx-auto">
        <div className="flex w-full flex-col md:flex-row">
          <SideSection>
            <div className="my-12 md:my-20 mx-6 md:mx-8 relative group">
              {mode === 'edit' && (
                <EditButton
                  className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 group-hover:transition-opacity"
                  title="Edit profile"
                >
                  <div className="pb-4">
                    {profile?.details?.profile?.pfp ? (
                      <Image
                        src={profile?.details?.profile?.pfp}
                        alt={uid}
                        className="rounded-avator mx-auto md:mx-0"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <div
                        className="bg-stripe w-32 h-32 rounded-avator mx-auto md:mx-0"
                        style={{ backgroundSize: '7px 7px' }}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <div>
                      <label
                        htmlFor="description"
                        className="text-right text-xs font-bold"
                      >
                        Description
                      </label>
                      <Textarea id="description" className="" />
                    </div>
                  </div>
                  <div className="pb-8">
                    <label
                      htmlFor="color"
                      className="text-right text-xs font-bold flex mb-2"
                    >
                      Accent color
                    </label>
                    <RadioGroup defaultValue={colors[0].slice(3)}>
                      {colors.map((cl: string) => (
                        <RadioGroupItem
                          key={`color-${cl.slice(3)}`}
                          value={cl.slice(3)}
                          id={cl.slice(3)}
                          className={cl}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                </EditButton>
              )}
              {profile?.details?.profile?.pfp ? (
                <Image
                  src={profile?.details?.profile?.pfp}
                  alt={uid}
                  className="rounded-avator"
                  width={128}
                  height={128}
                />
              ) : (
                <div
                  className="bg-stripe w-32 h-32 rounded-avator mx-auto md:mx-0"
                  style={{ backgroundSize: '7px 7px' }}
                />
              )}
              <p className="text-2xl font-bold text-primary mt-8 text-center md:text-left">
                {displayName[0]}
                <span className="opacity-30">.{displayName[1]}</span>
              </p>
              <p className="text-lg mt-8">
                {profile?.details?.profile?.description}
              </p>
            </div>
          </SideSection>
          <MainSection>
            <div className="py-12 md:py-20">
              {/* {credential?.length > 0 && (
                <div className="md:ml-20 px-6 md:px-8">
                  <h2 className="text-section-title mb-6">Credentials</h2>
                  <div className="grid grid-col-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {credential?.map((item: any) => (
                      <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
                        {item.provider}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
              {posts?.length > 0 && (
                <div className="md:ml-20 px-6 md:px-8 pt-12 md:pt-20">
                  <h2 className="text-section-title mb-6">Posts</h2>
                  <div className="grid grid-col-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {posts?.map((item: any, i: number) => (
                      <Post key={`post-${i}`} item={item} mode={mode} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </MainSection>
        </div>
      </div>
    </>
  )
}

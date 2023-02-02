/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MYSQL_HOST: '127.0.0.1',
    MYSQL_DATABASE: 'march_madness',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: 'password',
  }
}